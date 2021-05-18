package com.ilovefundy.service;

import com.ilovefundy.dao.DonationDao;
import com.ilovefundy.dao.DonationPlaceDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.donation.DonationPlaceListResponse;
import com.ilovefundy.entity.donation.DonationPlace;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.idol.Idol;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.dto.funding.FundingUserListResponse;
import com.ilovefundy.dto.idol.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
public class DonationService {
    private final FundingDao fundingDao;
    private final IdolDao idolDao;
    private final DonationDao donationDao;
    private final DonationPlaceDao donationPlaceDao;

    public List<DonationPlaceListResponse> getDonationPlaceList() {
        List<DonationPlaceListResponse> result = new LinkedList<>();
        List<DonationPlace> placeList = donationPlaceDao.findAll();
        for(DonationPlace place : placeList) {
            DonationPlaceListResponse response = new DonationPlaceListResponse();
            response.setDonationPlaceId(place.getDonationPlaceId());
            response.setPlaceName(place.getPlaceName());
            response.setPlaceAddress(place.getPlaceAddress());
            response.setPlacePicture(place.getPlacePicture());
            response.setPlaceDescription(place.getPlaceDescription());
            response.setPlaceTotalAmount(String.format("%d,",place.getPlaceTotalAmount()));
            result.add(response);
        }
        return result;
    }

    public List<IdolDonationListResponse> getIdolDonationList(int idol_id) {
        List<IdolDonationListResponse> result = new LinkedList<>();
        List<IIdolDonation> idolDonationList = donationDao.getIdolDonationList(idol_id);
        for(IIdolDonation donation : idolDonationList) {
            IdolDonationListResponse idolDonationListResponse = new IdolDonationListResponse();
            idolDonationListResponse.setDonationPlaceId(donation.getDonationPlaceId());
            System.out.println(donation.getDonationPlaceId());
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

    public List<IdolDonationRankingMonthlyResponse> getIdolDonationRankingMonthlyList() {
        List<IdolDonationRankingMonthlyResponse> result = new LinkedList<>();
        List<IIdolDonationRanking> idolDonationRankingList = donationDao.getTop5IdolDonationRanking();
        for(IIdolDonationRanking response : idolDonationRankingList) {
            Idol idol = idolDao.findByIdolId(response.getIdolId());
            IdolDonationRankingMonthlyResponse tmpResponse = new IdolDonationRankingMonthlyResponse();
            tmpResponse.setIdol_id(idol.getIdolId());
            tmpResponse.setId(idol.getIdolName());
            System.out.println(idol.getIdolName());
            List<ChartResponse> tmpChartResponse = new LinkedList<>();
            for(int i = 12; i >= 0; --i) {
                String ym = LocalDate.now().minusMonths(i).format(DateTimeFormatter.ofPattern("yyyy-MM"));
                List<IChartResponse> daoResponse = donationDao.getDonationMonthly(idol.getIdolId(), ym);
                // 해당 월에 아이돌의 기부내역이 없는 경우
                if(daoResponse == null) {
                    tmpChartResponse.add(new ChartResponse(ym, "0"));
                    continue;
                }
                long sum = 0;
                for(IChartResponse cr : daoResponse) {
                    sum += cr.getY();
                }
                ChartResponse resp = new ChartResponse(ym, String.format("%,d", sum));
                tmpChartResponse.add(resp);
            }
            tmpResponse.setData(tmpChartResponse);
            result.add(tmpResponse);
        }
        return result;
    }
}
