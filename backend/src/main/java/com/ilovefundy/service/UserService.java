package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingRegisterDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dao.PayDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.auth.FanAuth;
import com.ilovefundy.dto.auth.MyRegisteredFundingResponse;
import com.ilovefundy.dto.auth.ProfileAuth;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.funding.FundingRegister;
import com.ilovefundy.entity.idol.Idol;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.idol.IdolResponse;
import com.ilovefundy.dto.user.*;
import com.ilovefundy.security.JwtTokenProvider;
import com.ilovefundy.utils.DeduplicationUtils;
import com.ilovefundy.utils.EncryptionUtils;
import com.ilovefundy.utils.SetterUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final IdolDao idolDao;
    private final FundingDao fundingDao;
    private final FundingRegisterDao fundingRegisterDao;
    private final PayDao payDao;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3UploaderService s3UploaderService;

    // Form Validation 에러 메세지를 Map 에 담아 반환
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for(FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }

    public String getToken(User userInfo) {
//        Object user = userDao.
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userInfo.getIsAdmin().getValue()==1?"ADMIN":"MEMBER"));
        return jwtTokenProvider.createToken(userInfo.getUserEmail(), authorities);
    }

    public Optional<User> checkEmailAndPassword(String email, String password) {
        return userDao.findByUserEmailAndUserPassword(email, password);
    }

    public boolean isDuplicatedEmail(String email) {
        return userDao.findByUserEmail(email) != null;
    }

    public boolean isDuplicatedNickname(String nickname) {
        return userDao.findByUserNickname(nickname) != null;
    }

    public void signUp(SignupRequest req) {
        User user = new User();
        user.setUserEmail(req.getEmail());
        user.setUserPassword(EncryptionUtils.encryptSHA256(req.getPassword()));
        user.setUserNickname(req.getNickname());
        user.setUserAddress(req.getAddress());
        userDao.save(user);
    }

    public UserResponse getUserInfo(User user) {
        UserResponse newUser = new UserResponse();
        newUser.setUserId(user.getUserId());
        newUser.setUserPicture(user.getUserPicture());
        newUser.setUserNickname(user.getUserNickname());
        newUser.setUserEmail(user.getUserEmail());
        newUser.setUserAddress(user.getUserAddress());
        newUser.setUserLevel(user.getUserLevel().getValue());
        newUser.setIsAdult(user.getIsAdult().getValue() == 1 ? "Y" : "N");
        newUser.setIsPlus(user.getFundingRegistCount() >= 5 ? "Y" : "N");
        newUser.setIsOfficialFan(user.getIsOfficialFan().getValue());
        newUser.setIsProfile(user.getIsProfile().getValue());
        newUser.setRole(user.getIsAdmin().getValue() == 1 ? "ADMIN" : "MEMBER");
        return newUser;
    }

    public boolean checkNickname(String nickname) {
        return !Pattern.matches("^[A-Za-z가-힣]{2,8}$", nickname);
    }

    public void patchNickname(int user_id, String nickname) {
        User user = userDao.findByUserId(user_id);
        user.setUserNickname(nickname);
        userDao.save(user);
    }

    public void patchAddress(int user_id, String address) {
        User user = userDao.findByUserId(user_id);
        user.setUserAddress(address);
        userDao.save(user);
    }

    public boolean checkPassword(String password) {
        return !Pattern.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$", password);
    }

    public void patchPassword(int user_id, String password) {
        User user = userDao.findByUserId(user_id);
        user.setUserPassword(EncryptionUtils.encryptSHA256(password));
        userDao.save(user);
    }

    public String patchPicture(int user_id, MultipartFile multipartFile) throws IOException {
        User user = userDao.getOne(user_id);
        if(user.getUserPicture() != null) { // 원래 존재한 사진 삭제
            String picturePath = user.getUserPicture();
            String key = picturePath.substring(picturePath.lastIndexOf("static/"));
//            System.out.println(key);
            s3UploaderService.deleteFileInS3(key);
        }
        String picture = s3UploaderService.upload(multipartFile, "static");
        user.setUserPicture(picture);
        userDao.save(user);

        return picture;
    }

    public void deleteUser(int user_id) {
        userDao.deleteById(user_id);
    }

    public List<PayInfoResponse> getFundingPayList(int user_id) {
        User user = userDao.findByUserId(user_id);
        List<PayInfo> userPayInfo = user.getFundingPays();
        List<PayInfoResponse> myPayInfoResponseList = new LinkedList<>();
        for(PayInfo payInfo : userPayInfo) {
            FundingProject funding = payInfo.getFunding();
            User u = userDao.findByUserId(funding.getUserId());
            List<PayInfo> payInfoList = payDao.findByFundingAndPayAmountIsGreaterThan(funding, 0);
            List<PayInfo> payParticipantsList = DeduplicationUtils.deduplication(payInfoList, PayInfo::getUser);
            int participants = payParticipantsList.size();
            myPayInfoResponseList.add(SetterUtils.setMyPayInfo(payInfo, funding, u, participants));
        }
        return myPayInfoResponseList;
    }

    public List<MyRegisteredFundingResponse> getMyRegisteredFundingList(int user_id) {
        List<FundingProject> myRegisteredFunding = fundingDao.findByUserId(user_id);
        List<MyRegisteredFundingResponse> myRegisteredFundingList = new LinkedList<>();
        for(FundingProject fundingProject : myRegisteredFunding) {
            myRegisteredFundingList.add(SetterUtils.setMyRegisteredFundingResponse(fundingProject));
        }
        return myRegisteredFundingList;
    }

    public List<FundingListResponse> getMyFundingList(int user_id) {
        User user = userDao.findByUserId(user_id);
        Set<FundingProject> myFunding = user.getFundings();
        List<FundingListResponse> myFundingListResponse = new LinkedList<>();
        for(FundingProject fundingProject : myFunding) {
            myFundingListResponse.add(SetterUtils.setFundingListResponse(fundingProject));
        }
        return myFundingListResponse;
    }

    @Transactional
    public void addMyFunding(int user_id, int funding_id) {
        User user = userDao.getOne(user_id);
        FundingProject funding = fundingDao.getOne(funding_id);
        user.getFundings().add(funding);
        funding.getUsers().add(user);
        userDao.save(user);
    }

    @Transactional
    public void removeMyFunding(int user_id, int funding_id) {
        FundingProject funding = fundingDao.getOne(funding_id);
        User user = userDao.getOne(user_id);
        user.getFundings().remove(funding);
        funding.getUsers().remove(user);
        userDao.save(user);
    }

    public List<IdolResponse> getMyIdolList(int user_id) {
        User user = userDao.findByUserId(user_id);
        Set<Idol> myIdolList = user.getIdols();
        List<IdolResponse> myIdolResponseList = new LinkedList<>();
        for(Idol idol : myIdolList) {
            myIdolResponseList.add(SetterUtils.setIdolResponse(idol));
        }
        return myIdolResponseList;
    }

    @Transactional
    public void addMyIdol(int user_id, int idol_id) {
        User user = userDao.getOne(user_id);
        Idol idol = idolDao.getOne(idol_id);
        user.getIdols().add(idol);
        idol.getUsers().add(user);
        userDao.save(user);
    }

    @Transactional
    public void removeMyIdol(int user_id, int idol_id) {
        User user = userDao.getOne(user_id);
        Idol idol = idolDao.getOne(idol_id);
        user.getIdols().remove(idol);
        idol.getUsers().remove(user);
        userDao.save(user);
    }

    // 팬 활동 인증 등록 신청
    @Transactional
    public void createFanAuth(int user_id, FanAuth fanAuth) {
        User user = userDao.getOne(user_id);
        Optional<FundingRegister> fundingRegisterOpt = fundingRegisterDao.findByUser_UserId(user.getUserId());
        // 인증 등록을 처음 하는 경우
        if(!fundingRegisterOpt.isPresent()) {
            FundingRegister fundingRegister = new FundingRegister();
            fundingRegister.setUser(user);
            fundingRegister.setOfficialFanHistory(fanAuth.getFanHistory());
            fundingRegisterDao.save(fundingRegister);
        }
        // 팬활동 인증으로 이미 정보가 있는 경우 or 재신청 하는 경우
        else {
            fundingRegisterOpt.get().setOfficialFanHistory(fanAuth.getFanHistory());
            fundingRegisterDao.save(fundingRegisterOpt.get());
        }
        user.setIsOfficialFan(User.IsCertification.Waiting);
        userDao.save(user);
    }

    //프로필 인증 등록 신청
    @Transactional
    public void createProfileAuth(int user_id, ProfileAuth profileAuth) throws IOException {
        User user = userDao.getOne(user_id);
        Optional<FundingRegister> fundingRegisterOpt = fundingRegisterDao.findByUser_UserId(user.getUserId());
        String picture_path = s3UploaderService.upload(profileAuth.getProfilePicture(), "static");
        // 인증 등록을 처음 하는 경우
        if(!fundingRegisterOpt.isPresent()) {
            FundingRegister fundingRegister = new FundingRegister();
            fundingRegister.setUser(user);
            fundingRegister.setFundingRegisterName(profileAuth.getName());
            fundingRegister.setFundingRegisterPicture(picture_path);
            fundingRegister.setFundingRegisterAge(profileAuth.getAge());
            fundingRegister.setFundingRegisterHistory(profileAuth.getProfileHistory());
            fundingRegisterDao.save(fundingRegister);
        }
        // 프로필 인증으로 이미 정보가 있는 경우 or 재신청 하는 경우
        else {
            if(fundingRegisterOpt.get().getFundingRegisterPicture() != null) {
                String path = fundingRegisterOpt.get().getFundingRegisterPicture();
                String key = path.substring(path.lastIndexOf("static/"));
                s3UploaderService.deleteFileInS3(key);
            }
            fundingRegisterOpt.get().setFundingRegisterName(profileAuth.getName());
            fundingRegisterOpt.get().setFundingRegisterPicture(picture_path);
            fundingRegisterOpt.get().setFundingRegisterAge(profileAuth.getAge());
            fundingRegisterOpt.get().setFundingRegisterHistory(profileAuth.getProfileHistory());
            fundingRegisterDao.save(fundingRegisterOpt.get());
        }
        user.setIsProfile(User.IsCertification.Waiting);
        userDao.save(user);
    }
}
