package com.ilovefundy.utils;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.idol.IdolResponse;

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
}
