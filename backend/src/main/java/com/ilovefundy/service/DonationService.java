package com.ilovefundy.service;

import com.ilovefundy.dao.DonationDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.donation.Donation;
import com.ilovefundy.dto.donation.DonationPlace;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class DonationService {
    private final FundingDao fundingDao;
    private final IdolDao idolDao;

    public List<Object> getIdolDonationList(int idol_id) {
        Idol idol = idolDao.findByIdolId(idol_id);
        List<Donation> idolDonationList = idol.getDonations();

        List<Object> result = new ArrayList<>();
        for(Donation donation : idolDonationList) {
            Map<String, Object> tmpDonation = new LinkedHashMap<>();
            DonationPlace place = donation.getDonationPlace();
            Map<String, Object> tmpPlace = new LinkedHashMap<>();
            tmpPlace.put("donationPlaceId", place.getDonationPlaceId());
            tmpPlace.put("placeName", place.getPlaceName());
            tmpPlace.put("placeAddress", place.getPlaceAddress());
            tmpPlace.put("placeTotalAmount", place.getPlaceTotalAmount());
            tmpPlace.put("accountNumber", place.getAccountNumber());
            tmpDonation.put("donationPlace", tmpPlace);
            tmpDonation.put("idolDonationAmount", donation.getIdolDonationAmount());
            result.add(tmpDonation);
        }
        return result;
    }

    public List<Object> getIdolDonationDetailList(int idol_id, int donation_place_id) {
        List<FundingProject> fundingProjectList = fundingDao.findByIdolIdAndDonationPlaceId(idol_id, donation_place_id);
        List<Object> result = new ArrayList<>();
        for(FundingProject funding : fundingProjectList) {
            Map<String, Object> tmpFunding = new LinkedHashMap<>();
            tmpFunding.put("fundingId", funding.getFundingId());
            tmpFunding.put("fundingName", funding.getFundingName());
            List<PayInfo> projectPayInfo = funding.getUserPays();   // 펀딩내역 금액높은 순으로 하면 좋을듯?
            List<Object> payList = new ArrayList<>();
            for(PayInfo pay : projectPayInfo) {
                Map<String, Object> tmpPay = new LinkedHashMap<>();
                tmpPay.put("userNickname", pay.getUser().getUserNickname());
                tmpPay.put("payAmount", pay.getPayAmount());
                tmpPay.put("payDatetime", pay.getPayDatetime());
                payList.add(tmpPay);
            }
            tmpFunding.put("payList", payList);
            result.add(tmpFunding);
        }
        return result;
    }
}
