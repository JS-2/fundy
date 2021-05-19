package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dao.PayDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.*;
import com.ilovefundy.dto.user.PayInfoResponse;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.idol.Idol;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.utils.CalculationUtils;
import com.ilovefundy.utils.DeduplicationUtils;
import com.ilovefundy.utils.SetterUtils;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.AccessToken;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class FundingService {
    private final FundingDao fundingDao;
    private final UserDao userDao;
    private final IdolDao idolDao;
    private final PayDao payDao;
    private final IamportService iamportService;
    private IamportClient client;
    private final S3UploaderService s3UploaderService;

    @PostConstruct
    public void FundingServiceInit() {
        this.client = iamportService.getClient();
    }

    public List<FundingListResponse> getFundingList(int page, int per_page, String keyword, Integer status) {
        List<FundingListResponse> fundingListResponse = new LinkedList<>();
        Page<FundingProject> pages = null;
        if (status != null) { // 펀딩 승인 여부에 따른 리스트
            FundingProject.FundingConfirm isStatus = null;
            if (status == 1 || status == 2 || status == 3) {
                if (status == 1) { // 승인 - 진행 전
                    isStatus = FundingProject.FundingConfirm.ApprovePre;
                    if (keyword != null) {
                        pages = fundingDao.findByFundingStartTimeAfterAndFundingNameContains(LocalDateTime.now(), keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.findByFundingStartTimeAfter(LocalDateTime.now(), PageRequest.of(page, per_page));
                    }
                }
                else if (status == 2) { // 승인 - 진행 중
                    isStatus = FundingProject.FundingConfirm.ApproveIng;
                    if (keyword != null) {
                        pages = fundingDao.findByFundingStartTimeBeforeAndFundingEndTimeAfterAndFundingNameContains(LocalDateTime.now(), LocalDateTime.now(), keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.findByFundingStartTimeBeforeAndFundingEndTimeAfter(LocalDateTime.now(), LocalDateTime.now(), PageRequest.of(page, per_page));
                    }
                }
                else if (status == 3) { // 승인 - 마감
                    isStatus = FundingProject.FundingConfirm.ApprovePost;
                    if (keyword != null) {
                        pages = fundingDao.findByFundingEndTimeBeforeAndFundingNameContains(LocalDateTime.now(), keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.findByFundingEndTimeBefore(LocalDateTime.now(), PageRequest.of(page, per_page));
                    }
                }
            }
            else {
                if (status == 0) { // 승인 대기
                    isStatus = FundingProject.FundingConfirm.Wait;
                }
                else if (status == 4) { // 승인 거절
                    isStatus = FundingProject.FundingConfirm.Decline;
                }
                else if (status == 5) { // 완료 - 성공
                    isStatus = FundingProject.FundingConfirm.Success;
                }
                else if (status == 6) { // 완료 - 실패
                    isStatus = FundingProject.FundingConfirm.Fail;
                }

                if (keyword != null) {
                    pages = fundingDao.findByFundingNameContainsAndIsConfirm(keyword, isStatus, PageRequest.of(page, per_page));
                }
                else {
                    pages = fundingDao.findByIsConfirm(isStatus, PageRequest.of(page, per_page));
                }
            }

        }
        else { // 펀딩 전체보기
            if (keyword != null) {
                pages = fundingDao.findByFundingNameContains(keyword, PageRequest.of(page, per_page));
            }
            else {
                pages = fundingDao.findAll(PageRequest.of(page, per_page));
            }
        }

        List<FundingProject> fundingProjectList = pages.getContent();
        for (int i=0; i<fundingProjectList.size(); i++){
            List<PayInfo> payInfoList = payDao.findByFunding(fundingProjectList.get(i));
            List<PayInfo> payParticipantsList = DeduplicationUtils.deduplication(payInfoList, PayInfo::getUser);
            int participants = payParticipantsList.size();
            fundingListResponse.add(SetterUtils.setFundingListResponse(fundingProjectList.get(i), participants));
        }

        return fundingListResponse;
    }
    public List<FundingRankListResponse> getFundingListRank(int page, int per_page) {
        List<FundingRankListResponse> fundingRankListResponse = new LinkedList<>();
        FundingProject.FundingConfirm isStatus = FundingProject.FundingConfirm.ApproveIng; // 진행중인 펀딩에서 참여자순
        Page<FundingProject> pages = fundingDao.findByFundingStartTimeBeforeAndFundingEndTimeAfter(LocalDateTime.now(), LocalDateTime.now(), PageRequest.of(page, per_page));
        List<FundingProject> fundingProjectList = pages.getContent();
        for (int i=0; i<fundingProjectList.size(); i++){
            List<PayInfo> payInfoList = payDao.findByFunding(fundingProjectList.get(i));
            List<PayInfo> payParticipantsList = DeduplicationUtils.deduplication(payInfoList, PayInfo::getUser);
            int participants = payParticipantsList.size();
            fundingRankListResponse.add(SetterUtils.setFundingRankListResponse(fundingProjectList.get(i), participants));
        }
        Collections.sort(fundingRankListResponse, (a, b) -> b.getFundingParticipants() - a.getFundingParticipants());
        return fundingRankListResponse;
    }

    public FundingDetailResponse getFunding(int id) {
        FundingProject fundingProject = fundingDao.findByFundingId(id);
        FundingDetailResponse fundingDetailResponse = new FundingDetailResponse();
        User user = userDao.findByUserId(fundingProject.getUserId());
        List<PayInfo> payInfoList = payDao.findByFunding(fundingProject);
        List<PayInfo> payParticipantsList = DeduplicationUtils.deduplication(payInfoList, PayInfo::getUser);
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
        fundingDetailResponse.setFundingGoalAmount(String.format("%,d", fundingProject.getFundingGoalAmount()));
        fundingDetailResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
        fundingDetailResponse.setFundingType(fundingProject.getFundingType());
        fundingDetailResponse.setDonationRate(fundingProject.getDonationRate());
        FundingProject.FundingConfirm confirm = fundingProject.getIsConfirm();
        if (confirm == FundingProject.FundingConfirm.ApprovePre || confirm == FundingProject.FundingConfirm.ApproveIng) {
            if (LocalDateTime.now().isAfter(fundingProject.getFundingStartTime()) && LocalDateTime.now().isBefore(fundingProject.getFundingEndTime())) {
                confirm = FundingProject.FundingConfirm.ApproveIng;
                fundingProject.setIsConfirm(confirm);
                fundingDao.save(fundingProject);
            }
            else if (LocalDateTime.now().isAfter(fundingProject.getFundingEndTime())){
                confirm = FundingProject.FundingConfirm.ApprovePost;
                fundingProject.setIsConfirm(confirm);
                fundingDao.save(fundingProject);
            }
        }
        fundingDetailResponse.setFundingConfirm(confirm);
        fundingDetailResponse.setIsGoodFunding(fundingProject.getIsGoodFunding());
        fundingDetailResponse.setIsAdult(user.getIsAdult());
        fundingDetailResponse.setIsOfficialFan(user.getIsOfficialFan());
        fundingDetailResponse.setIsProfile(user.getIsProfile());
        fundingDetailResponse.setIsPlus(user.getFundingRegistCount() > 5 ? User.YesOrNo.Y : User.YesOrNo.N);

        int remainDay =  fundingProject.getFundingEndTime().getDayOfYear() - LocalDateTime.now().getDayOfYear();
        fundingDetailResponse.setFundingRemainDay(remainDay);
        int amount = CalculationUtils.getFundingAmount(fundingProject);
        fundingDetailResponse.setFundingAmount(String.format("%,d", amount));
        int achievementRate = CalculationUtils.getAchievementRate(amount, fundingProject.getFundingGoalAmount());
        fundingDetailResponse.setFundingAchievementRate(achievementRate);
        int participants = payParticipantsList.size();
        fundingDetailResponse.setFundingParticipants(participants);
        return fundingDetailResponse;
    }

    @Transactional
    public boolean patchFundingState(int funding_id, boolean isApprove, String isGoodProject) {
        FundingProject fundingProject = fundingDao.getOne(funding_id);
        if (fundingProject.getIsConfirm() != FundingProject.FundingConfirm.Wait) {
            return false;
        }
        fundingProject.setIsConfirm(isApprove ? FundingProject.FundingConfirm.ApprovePre : FundingProject.FundingConfirm.Decline);
        fundingProject.setIsGoodFunding(isGoodProject.equals("Y") ? FundingProject.YesOrNo.Y : FundingProject.YesOrNo.N);
        fundingDao.save(fundingProject);

        // Default PayInfo - 관리자 계정이 모금액 0으로 펀딩. 모금이 없는 예외상황 처리
        PayInfo payInfo = new PayInfo();
        payInfo.setUser(userDao.getOne(1));
        payInfo.setFunding(fundingProject);
        payInfo.setPayAmount((long) 0);
        payInfo.setPayDatetime(LocalDateTime.now());
        payDao.save(payInfo);

        int user_id = fundingProject.getUserId();
        User user = userDao.getOne(user_id);
        user.setFundingRegistCount(user.getFundingRegistCount()+1);
        userDao.save(user);
        return true;
    }

    public void addFunding(int user_id, FundingRequest req) throws IOException {
        Idol idol = idolDao.findByIdolId(req.getIdolId());
        FundingProject fundingProject = new FundingProject();
        fundingProject.setFundingType(req.getFundingType());
        fundingProject.setUserId(user_id);
        fundingProject.setFundingName(req.getFundingName());
        fundingProject.setFundingSubtitle(req.getFundingSubtitle());
        fundingProject.setFundingContent(req.getFundingContent());
        fundingProject.setIdolId(req.getIdolId());
        fundingProject.setIdolName(idol.getIdolName());
        fundingProject.setFundingGoalAmount(req.getGoalAmount());
        fundingProject.setFundingStartTime(req.getStartTime());
        fundingProject.setFundingEndTime(req.getEndTime());
        String picture_path = s3UploaderService.upload(req.getThumbnail(), "static");
        fundingProject.setFundingThumbnail(picture_path);
        if(req.getFundingType() == FundingProject.FundingType.Donation) {
            req.setDonationRate(100);
        }
        fundingProject.setDonationRate(req.getDonationRate());
        fundingProject.setDonationPlaceId(req.getDonationPlaceId());
        fundingProject.setIsConfirm(FundingProject.FundingConfirm.Wait);
        fundingDao.save(fundingProject);
    }

    public PayInfoResponse addFundingPay(int user_id, int funding_id, FundingPayRequest req) throws IOException, IamportResponseException {
        IamportResponse<AccessToken> getToken = client.getAuth();
        String access_token = getToken.getResponse().getToken();
        IamportResponse<Payment> payment = client.paymentByImpUid(req.getImpUid());
        BigDecimal payAmount = new BigDecimal(req.getPayAmount());
        // 결제 금액이 맞는지 확인
        if(!payAmount.equals(payment.getResponse().getAmount())) {
            // 금액이 다르면 결제취소
            return null;
        }
        FundingProject fundingProject = fundingDao.findByFundingId(funding_id);
        User user = userDao.findByUserId(user_id);
        PayInfo payInfo = new PayInfo();
        payInfo.setPayAmount(req.getPayAmount());
        payInfo.setPayDatetime(LocalDateTime.now());
        payInfo.setFunding(fundingProject);
        payInfo.setUser(user);
        PayInfo tmpPayInfo = payDao.saveAndFlush(payInfo);

        FundingProject funding = tmpPayInfo.getFunding();
        User u = userDao.findByUserId(funding.getUserId());
        PayInfoResponse payInfoResponse = SetterUtils.setMyPayInfo(payInfo, funding, u);
        return payInfoResponse;
    }

}
