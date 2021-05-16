package com.ilovefundy.service;

import com.ilovefundy.dao.DonationPlaceDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingRegisterDao;
import com.ilovefundy.dao.PayDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.entity.donation.DonationPlace;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.funding.FundingRegister;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class AdminService {
    private final FundingRegisterDao fundingRegisterDao;
    private final UserDao userDao;
    private final FundingDao fundingDao;
    private final DonationPlaceDao donationPlaceDao;

    public List<Object> getFanAuthList(int page, int per_page) {
        List<Object> fanAuthList = new LinkedList<>();
        Page<FundingRegister> fundingRegisters = fundingRegisterDao
                .findByUser_IsOfficialFanAndOfficialFanHistoryIsNotNull
                        (User.IsCertification.Waiting, PageRequest.of(page-1, per_page));
        for(FundingRegister auth : fundingRegisters) {
            User user = auth.getUser();
            Map<String, Object> userInfo = new LinkedHashMap<>();
            userInfo.put("userId", user.getUserId());
            userInfo.put("userNickname", user.getUserNickname());
            Map<String, Object> tmp = new LinkedHashMap<>();
            tmp.put("user", userInfo);
            tmp.put("officialFanHistory", auth.getOfficialFanHistory());
            fanAuthList.add(tmp);
        }
        return fanAuthList;
    }

    public void patchFanAuth(int user_id, boolean isAccept) { //팬활동 승인절차
        User user = userDao.getOne(user_id);
        // 승인
        if(isAccept) {
            user.setIsOfficialFan(User.IsCertification.Approve);
            userDao.save(user);
        }
        // 거절
        else {
            Optional<FundingRegister> fundingRegisterOpt = fundingRegisterDao.findByUser_UserId(user_id);
            if(fundingRegisterOpt.isPresent()) {
                fundingRegisterOpt.get().setOfficialFanHistory(null);
                user.setIsOfficialFan(User.IsCertification.Decline);
                fundingRegisterDao.save(fundingRegisterOpt.get());
            }
        }
    }

    public List<Object> getProfileAuthList(int page, int per_page) {
        List<Object> profileAuthList = new LinkedList<>();
        Page<FundingRegister> fundingRegisters = fundingRegisterDao
                .findByUser_IsProfileAndFundingRegisterNameIsNotNull(User.IsCertification.Waiting, PageRequest.of(page-1, per_page));
        for(FundingRegister auth : fundingRegisters) {
            User user = auth.getUser();
            Map<String, Object> userInfo = new LinkedHashMap<>();
            userInfo.put("userId", user.getUserId());
            userInfo.put("userNickname", user.getUserNickname());
            Map<String, Object> profile = new LinkedHashMap<>();
            profile.put("profileName", auth.getFundingRegisterName());
            profile.put("profilePicture", auth.getFundingRegisterPicture());
            profile.put("profileAge", auth.getFundingRegisterAge());
            profile.put("profileHistory", auth.getFundingRegisterHistory());
            Map<String, Object> tmp = new LinkedHashMap<>();
            tmp.put("user", userInfo);
            tmp.put("profile", profile);
            profileAuthList.add(tmp);
        }
        return profileAuthList;
    }

    public void patchProfileAuth(int user_id, boolean isAccept) { //프로필 승인절차
        User user = userDao.getOne(user_id);
        // 승인
        if(isAccept) {
            user.setIsProfile(User.IsCertification.Approve);
            userDao.save(user);
        }
        // 거절
        else {
            Optional<FundingRegister> fundingRegisterOpt = fundingRegisterDao.findByUser_UserId(user_id);
            if(fundingRegisterOpt.isPresent()) {
                fundingRegisterOpt.get().setFundingRegisterName(null);
                fundingRegisterOpt.get().setFundingRegisterPicture(null);
                fundingRegisterOpt.get().setFundingRegisterAge(null);
                fundingRegisterOpt.get().setFundingRegisterHistory(null);
                user.setIsProfile(User.IsCertification.Decline);
                fundingRegisterDao.save(fundingRegisterOpt.get());
            }
        }
    }

    @Transactional
    public boolean completeFunding(int funding_id) {
        FundingProject fundingProject = fundingDao.findByFundingId(funding_id);
        // 이미 완료 처리된 프로젝트라면
        if(fundingProject.getIsConfirm() == FundingProject.FundingConfirm.Complete) {
            return false;
        }
        // 기부와 관련된 프로젝트라면
        if(fundingProject.getDonationRate() > 0 || fundingProject.getFundingType() == FundingProject.FundingType.Donation) {
            DonationPlace donationPlace = donationPlaceDao.findByDonationPlaceId(fundingProject.getDonationPlaceId());
            long fundingAmount = 0;
            List<PayInfo> fundingPayInfoList = fundingProject.getUserPays();
            for(PayInfo payInfo : fundingPayInfoList) {
                fundingAmount += payInfo.getPayAmount();
            }
            donationPlace.setPlaceTotalAmount(donationPlace.getPlaceTotalAmount() + fundingAmount);
            donationPlaceDao.save(donationPlace);
        }
        fundingProject.setIsConfirm(FundingProject.FundingConfirm.Complete);
        fundingDao.save(fundingProject);
        return true;
    }
}
