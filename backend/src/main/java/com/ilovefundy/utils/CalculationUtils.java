package com.ilovefundy.utils;

import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.pay.PayInfo;

import java.util.List;

public class CalculationUtils {
    public static int getFundingAmount(FundingProject funding) {
        int amount = 0;
        List<PayInfo> payInfo = funding.getUserPays();
        for(PayInfo pay : payInfo) {
            amount += pay.getPayAmount();
        }
        return amount;
    }

    public static int getAchievementRate(int amount, int goalAmount) {
        int achievementRate = 0;
        if(goalAmount != 0) {
            achievementRate = (int) (100 * ((float) amount / (float) goalAmount));
        }
        return achievementRate;
    }
}
