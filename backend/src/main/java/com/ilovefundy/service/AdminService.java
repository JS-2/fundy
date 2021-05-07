package com.ilovefundy.service;

import com.ilovefundy.dao.FundingRegisterDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.FundingRegister;
import com.ilovefundy.dto.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;

@RequiredArgsConstructor
@Service
public class AdminService {
    private final FundingRegisterDao fundingRegisterDao;
    private final UserDao userDao;

    public List<Object> getFanAuthList(int page, int per_page) {
        List<Object> fanAuthList = new LinkedList<>();
        Page<FundingRegister> fundingRegisters = fundingRegisterDao
                .findByUser_IsOfficialFanAndOfficialFanHistoryIsNotNull
                        (User.YesOrNo.N, PageRequest.of(page-1, per_page));
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

    public void patchFanAuth(int user_id, boolean isAccept) {
        // 승인
        if(isAccept) {
            User user = userDao.getOne(user_id);
            user.setIsOfficialFan(User.YesOrNo.Y);
            userDao.save(user);
        }
        // 거절
        else {
            Optional<FundingRegister> fundingRegisterOpt = fundingRegisterDao.findByUser_UserId(user_id);
            if(fundingRegisterOpt.isPresent()) {
                fundingRegisterOpt.get().setOfficialFanHistory(null);
                fundingRegisterDao.save(fundingRegisterOpt.get());
            }
        }
    }

    public List<Object> getProfileAuthList(int page, int per_page) {
        List<Object> profileAuthList = new LinkedList<>();
        Page<FundingRegister> fundingRegisters = fundingRegisterDao
                .findByUser_IsProfileAndFundingRegisterNameIsNotNull(User.YesOrNo.N, PageRequest.of(page-1, per_page));
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

    public void patchProfileAuth(int user_id, boolean isAccept) {
        // 승인
        if(isAccept) {
            User user = userDao.getOne(user_id);
            user.setIsProfile(User.YesOrNo.Y);
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
                fundingRegisterDao.save(fundingRegisterOpt.get());
            }
        }
    }
}
