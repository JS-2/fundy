package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingDetailResponse;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.funding.FundingRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.utils.CalculationUtils;
import com.ilovefundy.utils.SetterUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class FundingService {
    private final FundingDao fundingDao;
    private final UserDao userDao;

    public List<FundingListResponse> getFundingList(int page, int per_page, String keyword) {
        List<FundingListResponse> fundingListResponse = new LinkedList<>();
//        Page<FundingProject> pages = fundingDao.findAll(PageRequest.of(page, per_page, new Sort(Sort.Direction.DESC, "fundingEndTime")));
        Page<FundingProject> pages;
        if (keyword != null) {
            pages = fundingDao.findByFundingNameContains(keyword, PageRequest.of(page, per_page));
        }
        else {
            pages = fundingDao.findAll(PageRequest.of(page, per_page));
        }
        List<FundingProject> fundingProjectList = pages.getContent();
        for (FundingProject fundingProject : fundingProjectList){
            fundingListResponse.add(SetterUtils.setFundingListResponse(fundingProject));
        }
        return fundingListResponse;
    }

    public FundingDetailResponse getFunding(int id) {
        FundingProject fundingProject = fundingDao.findByFundingId(id);
        FundingDetailResponse fundingDetailResponse = new FundingDetailResponse();
        User user = userDao.findByUserId(fundingProject.getUserId());
        fundingDetailResponse.setFundingId(fundingProject.getFundingId());
        fundingDetailResponse.setFundingId(fundingProject.getFundingId());
        fundingDetailResponse.setIdolId(fundingProject.getIdolId());
        fundingDetailResponse.setUserId(fundingProject.getUserId());
        fundingDetailResponse.setUserNickname(user.getUserNickname());
        fundingDetailResponse.setFundingName(fundingProject.getFundingName());
        fundingDetailResponse.setIdolName(fundingProject.getIdolName());
        fundingDetailResponse.setFundingSubtitle(fundingProject.getFundingSubtitle());
        fundingDetailResponse.setDonationPlaceId(fundingProject.getDonationPlaceId());
        fundingDetailResponse.setFundingContent(fundingProject.getFundingContent());
        fundingDetailResponse.setFundingStartTime(fundingProject.getFundingStartTime());
        fundingDetailResponse.setFundingEndTime(fundingProject.getFundingEndTime());
        fundingDetailResponse.setFundingGoalAmount(fundingProject.getFundingGoalAmount());
        fundingDetailResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
        fundingDetailResponse.setFundingType(fundingProject.getFundingType());
        fundingDetailResponse.setIsDonate(fundingProject.getIsDonate());
        fundingDetailResponse.setFundingConfirm(fundingProject.getIsConfirm());
        fundingDetailResponse.setIsGoodFunding(fundingProject.getIsGoodFunding());
        int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
        fundingDetailResponse.setFundingRemainDay(remainDay);
        int amount = CalculationUtils.getFundingAmount(fundingProject);
        fundingDetailResponse.setFundingAmount(String.format("%,d", amount));
        int achievementRate = CalculationUtils.getAchievementRate(amount, fundingProject.getFundingGoalAmount());
        fundingDetailResponse.setFundingAchievementRate(achievementRate);
        return fundingDetailResponse;
    }

    @Transactional
    public void patchFundingState(int funding_id, boolean isApprove, char isGoodProject) {
        FundingProject fundingProject = fundingDao.getOne(funding_id);
        fundingProject.setIsConfirm(isApprove ? FundingProject.FundingConfirm.Approve : FundingProject.FundingConfirm.Decline);
        fundingProject.setIsGoodFunding(isGoodProject == 'Y' ? FundingProject.YesOrNo.Y : FundingProject.YesOrNo.N);
        fundingDao.save(fundingProject);
        int user_id = fundingProject.getUserId();
        User user = userDao.getOne(user_id);
        user.setFundingRegistCount(user.getFundingRegistCount()+1);
        userDao.save(user);
    }

    public void addFunding(FundingRequest req) {
        FundingProject fundingProject = new FundingProject();
        fundingProject.setFundingType(req.getFundingType());
        fundingProject.setUserId(req.getUserId());
        fundingProject.setFundingName(req.getFundingName());
        fundingProject.setFundingSubtitle(req.getFundingSubtitle());
        fundingProject.setFundingContent(req.getFundingContent());
        fundingProject.setIdolId(req.getIdolId());
        fundingProject.setIdolName(req.getIdolName());
        fundingProject.setFundingGoalAmount(req.getGoalAmount());
        fundingProject.setFundingStartTime(req.getStartTime());
        fundingProject.setFundingEndTime(req.getEndTime());
        fundingProject.setFundingThumbnail(req.getThumbnail());
        fundingProject.setIsDonate(req.getIsDonate());
        fundingProject.setIsConfirm(FundingProject.FundingConfirm.Wait);
        fundingDao.save(fundingProject);
    }

}
