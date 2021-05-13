package com.ilovefundy.utils;

import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.idol.Idol;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.idol.IdolResponse;
import com.ilovefundy.dto.user.MyRegisteredFundingResponse;
import com.ilovefundy.dto.user.PayInfoResponse;

import java.time.LocalDateTime;

public class SetterUtils {
    public static IdolResponse setIdolResponse(Idol idol) {
        IdolResponse idolResponse = new IdolResponse();
        idolResponse.setIdolId(idol.getIdolId());
        idolResponse.setIdolGroupId(idol.getIdolGroup().getIdolId());
        idolResponse.setIdolName(idol.getIdolName());
        idolResponse.setIdolPicture(idol.getIdolPicture());
        idolResponse.setIdolAgency(idol.getIdolAgency());
        idolResponse.setIdolBirthday(idol.getIdolBirthday());
        idolResponse.setIdolAge(idol.getIdolAge());
        idolResponse.setIdolBlood(idol.getIdolBlood());
        idolResponse.setIdolHeight(idol.getIdolHeight());
        idolResponse.setIdolWeight(idol.getIdolWeight());
        return idolResponse;
    }

    public static FundingListResponse setFundingListResponse(FundingProject fundingProject) {
        FundingListResponse fundingResponse = new FundingListResponse();
        fundingResponse.setFundingId(fundingProject.getFundingId());
        fundingResponse.setFundingName(fundingProject.getFundingName());
        fundingResponse.setFundingSubtitle(fundingProject.getFundingSubtitle());
        fundingResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
        int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
        fundingResponse.setFundingRemainDay(remainDay);
        int amount = CalculationUtils.getFundingAmount(fundingProject);
        fundingResponse.setFundingAmount(String.format("%,d", amount));
        int achievementRate = CalculationUtils.getAchievementRate(amount, fundingProject.getFundingGoalAmount());
        fundingResponse.setFundingAchievementRate(achievementRate);
        return fundingResponse;
    }

//    public static FundingDetailResponse setFundingDetailResponse(FundingProject fundingProject) {
//        FundingDetailResponse fundingDetailResponse = new FundingDetailResponse();
//        fundingDetailResponse.setFundingId(fundingProject.getFundingId());
//        fundingDetailResponse.setFundingId(fundingProject.getFundingId());
//        fundingDetailResponse.setIdolId(fundingProject.getIdolId());
//        fundingDetailResponse.setUserId(fundingProject.getUserId());
//        fundingDetailResponse.setFundingName(fundingProject.getFundingName());
//        fundingDetailResponse.setIdolName(fundingProject.getIdolName());
//        fundingDetailResponse.setFundingSubtitle(fundingProject.getFundingSubtitle());
//        fundingDetailResponse.setDonationPlaceId(fundingProject.getDonationPlaceId());
//        fundingDetailResponse.setFundingContent(fundingProject.getFundingContent());
//        fundingDetailResponse.setFundingStartTime(fundingProject.getFundingStartTime());
//        fundingDetailResponse.setFundingEndTime(fundingProject.getFundingEndTime());
//        fundingDetailResponse.setFundingGoalAmount(fundingProject.getFundingGoalAmount());
//        fundingDetailResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
//        fundingDetailResponse.setFundingType(fundingProject.getFundingType());
//        fundingDetailResponse.setIsDonate(fundingProject.getIsDonate());
//        fundingDetailResponse.setFundingConfirm(fundingProject.getIsConfirm());
//        fundingDetailResponse.setIsGoodFunding(fundingProject.getIsGoodFunding());
//        int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
//        fundingDetailResponse.setFundingRemainDay(remainDay);
//        int amount = CalculationUtils.getFundingAmount(fundingProject);
//        fundingDetailResponse.setFundingAmount(String.format("%,d", amount));
//        int achievementRate = CalculationUtils.getAchievementRate(amount, fundingProject.getFundingGoalAmount());
//        fundingDetailResponse.setFundingAchievementRate(achievementRate);
//        return fundingDetailResponse;
//    }

    public static MyRegisteredFundingResponse setMyRegisteredFundingResponse(FundingProject fundingProject) {
        MyRegisteredFundingResponse myRegisteredFundingResponse = new MyRegisteredFundingResponse();
        myRegisteredFundingResponse.setFundingId(fundingProject.getFundingId());
        myRegisteredFundingResponse.setFundingName(fundingProject.getFundingName());
        myRegisteredFundingResponse.setFundingSubtitle(fundingProject.getFundingSubtitle());
        myRegisteredFundingResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
        int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
        myRegisteredFundingResponse.setFundingRemainDay(remainDay);
        int amount = CalculationUtils.getFundingAmount(fundingProject);
        myRegisteredFundingResponse.setFundingAmount(String.format("%,d", amount));
        int achievementRate = CalculationUtils.getAchievementRate(amount, fundingProject.getFundingGoalAmount());
        myRegisteredFundingResponse.setFundingAchievementRate(achievementRate);
        myRegisteredFundingResponse.setIsConfirm(fundingProject.getIsConfirm());
        return myRegisteredFundingResponse;
    }

    public static PayInfoResponse setMyPayInfo(PayInfo payInfo) {
        PayInfoResponse payInfoResponse = new PayInfoResponse();
        FundingProject funding = payInfo.getFunding();
        payInfoResponse.setFundingId(funding.getFundingId());
        payInfoResponse.setFundingName(funding.getFundingName());
        payInfoResponse.setFundingSubtitle(funding.getFundingSubtitle());
        payInfoResponse.setUserNickname(payInfo.getUser().getUserNickname());
        payInfoResponse.setFundingStatement(LocalDateTime.now().isBefore(funding.getFundingEndTime()) ? "진행중" : "종료");
        payInfoResponse.setPayAmount(String.format("%,d", payInfo.getPayAmount()));
        payInfoResponse.setPayDatetime(payInfo.getPayDatetime());
        payInfoResponse.setFundingEndTime(funding.getFundingEndTime());
        return payInfoResponse;
    }
}
