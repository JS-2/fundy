package com.ilovefundy.utils;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.idol.IdolResponse;
import com.ilovefundy.model.user.MyRegisteredFundingResponse;
import com.ilovefundy.model.user.PayInfoResponse;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

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
