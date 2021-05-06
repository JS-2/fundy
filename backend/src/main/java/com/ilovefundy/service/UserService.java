package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.user.SignupRequest;
import com.ilovefundy.model.user.UserInfo;
import com.ilovefundy.security.JwtTokenProvider;
import com.ilovefundy.utils.EncryptionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final IdolDao idolDao;
    private final FundingDao fundingDao;
    private final JwtTokenProvider jwtTokenProvider;
    private final EntityManager em;

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

    public UserInfo getUserInfo(int user_id) {
        User user = userDao.findByUserId(user_id);
        UserInfo newUser = new UserInfo();
        newUser.setUserId(user.getUserId());
        newUser.setUserPicture(user.getUserPicture());
        newUser.setUserNickname(user.getUserNickname());
        newUser.setUserEmail(user.getUserEmail());
        newUser.setUserAddress(user.getUserAddress());
        newUser.setUserLevel(user.getUserLevel().getValue());
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

    public void patchPicture(int user_id, String picture) {
        User user = userDao.findByUserId(user_id);
        user.setUserPicture(picture);
        userDao.save(user);
    }

    public void deleteUser(int user_id) {
        userDao.deleteById(user_id);
    }

    public List<Object> getFundingPayList(int user_id) {
        User user = userDao.findByUserId(user_id);
        List<PayInfo> userPayInfo = user.getFundingPays();
        List<Object> result = new LinkedList<>();
        for(PayInfo pay : userPayInfo) {
            Map<String, Object> tmpFunding = new HashMap<>();
            tmpFunding.put("fundingId", pay.getFunding().getFundingId());
            tmpFunding.put("fundingName", pay.getFunding().getFundingName());
            tmpFunding.put("fundingType", pay.getFunding().getFundingType());
            tmpFunding.put("idolName", pay.getFunding().getIdolName());
            tmpFunding.put("fundingGoalAmount", pay.getFunding().getFundingGoalAmount());
            tmpFunding.put("fundingEndTime", pay.getFunding().getFundingEndTime());
            tmpFunding.put("fundingStatement", LocalDateTime.now().isBefore(pay.getFunding().getFundingEndTime()) ? "진행중" : "종료");
            tmpFunding.put("payAmount", pay.getPayAmount());
            result.add(tmpFunding);
        }
        return result;
    }

    public List<Object> getMyFundingList(int user_id) {
        User user = userDao.findByUserId(user_id);
        Set<FundingProject> myFunding = user.getFundings();
        List<Object> result = new LinkedList<>();
        for(FundingProject funding : myFunding) {
            Map<String, Object> tmpFunding = new HashMap<>();
            tmpFunding.put("fundingId", funding.getFundingId());
            tmpFunding.put("fundingName", funding.getFundingName());
            tmpFunding.put("fudningThumbnail", funding.getFundingThumbnail());
            int remainDay =  funding.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
            tmpFunding.put("fundingRemainDay", remainDay);
            int amount = 0;
            List<PayInfo> payInfo = funding.getUserPays();
            for(PayInfo pay : payInfo) {
                amount += pay.getPayAmount();
            }
            int achievementRate = 0;
            if(funding.getFundingGoalAmount() != 0) {
                achievementRate = 100 * amount / funding.getFundingGoalAmount();
            }
            tmpFunding.put("fundingAchievementRate", achievementRate);
            result.add(tmpFunding);
        }
        return result;
    }

    @Transactional
    public void addMyFunding(int user_id, int funding_id) {
        User user = userDao.getOne(user_id);
        FundingProject funding = fundingDao.getOne(funding_id);
//        if(user.getFundings() == null) {
//            user.setFundings(new LinkedHashSet<>());
//        }
        user.getFundings().add(funding);
        funding.getUsers().add(user);
        userDao.save(user);
    }

    @Transactional
    public void removeMyFunding(int user_id, int funding_id) {
        User user = userDao.getOne(user_id);
        FundingProject funding = fundingDao.getOne(funding_id);
        user.getFundings().remove(funding);
        funding.getUsers().remove(user);
        userDao.save(user);
    }

    public Set<Idol> getMyIdolList(int user_id) {
        User user = userDao.findByUserId(user_id);
        return user.getIdols();
    }

    @Transactional
    public void addMyIdol(int user_id, int idol_id) {
        User user = userDao.getOne(user_id);
        Idol idol = idolDao.getOne(idol_id);
//        if(user.getIdols() == null) {
//            user.setIdols(new LinkedHashSet<>());
//        }
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
}
