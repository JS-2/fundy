package com.ilovefundy.service;

import com.ilovefundy.dao.DonationDao;
import com.ilovefundy.dao.DonationPlaceDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.donation.DonationPlace;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.idol.Idol;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.funding.FundingUserListResponse;
import com.ilovefundy.model.idol.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class DonationService {
    private final FundingDao fundingDao;
    private final IdolDao idolDao;
    private final DonationDao donationDao;
    private final DonationPlaceDao donationPlaceDao;

    public List<IdolDonationListResponse> getIdolDonationList(int idol_id) {
        List<IdolDonationListResponse> result = new LinkedList<>();
        List<IIdolDonation> idolDonationList = donationDao.getIdolDonationList(idol_id);
        for(IIdolDonation donation : idolDonationList) {
            IdolDonationListResponse idolDonationListResponse = new IdolDonationListResponse();
            idolDonationListResponse.setDonationPlaceId(donation.getDonationPlaceId());
            DonationPlace place = donationPlaceDao.findByDonationPlaceId(donation.getDonationPlaceId());
            idolDonationListResponse.setPlaceName(place.getPlaceName());
            idolDonationListResponse.setPlaceAddress(place.getPlaceAddress());
            idolDonationListResponse.setIdolDonationPlaceAmount(donation.getDonationAmount());
            result.add(idolDonationListResponse);
        }
        return result;
    }

    public List<IdolDonationDetailResponse> getIdolDonationDetailList(int idol_id, int donation_place_id) {
        List<FundingProject> fundingProjectList = fundingDao.findByIdolIdAndDonationPlaceId(idol_id, donation_place_id);
        List<IdolDonationDetailResponse> result = new LinkedList<>();
        for(FundingProject funding : fundingProjectList) {
            IdolDonationDetailResponse idolDonationDetailResponse = new IdolDonationDetailResponse();
            idolDonationDetailResponse.setFundingId(funding.getFundingId());
            idolDonationDetailResponse.setFundingName(funding.getFundingName());

            List<FundingUserListResponse> users = new LinkedList<>();
            List<PayInfo> projectPayInfo = funding.getUserPays();   // 펀딩내역 금액높은 순으로 하면 좋을듯?
            for(PayInfo pay : projectPayInfo) {
                FundingUserListResponse fundingUserListResponse = new FundingUserListResponse();
                User user = pay.getUser();
                fundingUserListResponse.setUserId(user.getUserId());
                fundingUserListResponse.setUserNickname(user.getUserNickname());
                fundingUserListResponse.setPayAmount(String.format("%,d", pay.getPayAmount()));
                fundingUserListResponse.setPayDatetime(pay.getPayDatetime());
                users.add(fundingUserListResponse);
            }
            // 나중에 금액별로 소팅
            idolDonationDetailResponse.setUsers(users);
            result.add(idolDonationDetailResponse);
        }
        return result;
    }

    public List<IdolDonationRankingResponse> getIdolDonationRankingList() {
        List<IdolDonationRankingResponse> result = new LinkedList<>();
        List<IIdolDonationRanking> idolDonationRankingList = donationDao.getTop5IdolDonationRanking();
        for(IIdolDonationRanking response : idolDonationRankingList) {
            IdolDonationRankingResponse idolDonationRankingResponse = new IdolDonationRankingResponse();
            idolDonationRankingResponse.setIdolId(response.getIdolId());
            Idol idol = idolDao.findByIdolId(response.getIdolId());
            idolDonationRankingResponse.setIdolName(idol.getIdolName());
            idolDonationRankingResponse.setDonationAmount(response.getDonationAmount());
            result.add(idolDonationRankingResponse);
        }
        return result;
    }
}
