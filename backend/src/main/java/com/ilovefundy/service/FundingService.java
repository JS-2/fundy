package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.PayDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.FundingPayRequest;
import com.ilovefundy.dto.user.PayInfoResponse;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingDetailResponse;
import com.ilovefundy.dto.funding.FundingListResponse;
import com.ilovefundy.dto.funding.FundingRequest;
import com.ilovefundy.entity.pay.PayInfo;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.utils.CalculationUtils;
import com.ilovefundy.utils.SetterUtils;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.AccessToken;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final PayDao payDao;
    private final IamportService iamportService;
    private IamportClient client;
    private final S3UploaderService s3UploaderService;

    @PostConstruct
    public void FundingServiceInit() {
        this.client = iamportService.getClient();
    }

    public List<FundingListResponse> getFundingList(int page, int per_page, String keyword, Integer status, Integer time) {
        List<FundingListResponse> fundingListResponse = new LinkedList<>();
        Page<FundingProject> pages = null;
        if (status != null) { // 펀딩 승인 여부에 따른 리스트
            FundingProject.FundingConfirm isStatus;
            if (status == 0) {
                isStatus = FundingProject.FundingConfirm.Wait;
                if (keyword != null) {
                    pages = fundingDao.findByFundingNameContainsAndIsConfirm(keyword, isStatus, PageRequest.of(page, per_page));
                }
                else {
                    pages = fundingDao.findByIsConfirm(isStatus, PageRequest.of(page, per_page));
                }
            }
            else if (status == 1) {
                isStatus = FundingProject.FundingConfirm.Approve;
                if (time == 0) { // 승인된 펀딩 진행 전
                    if (keyword != null) {
                        pages = fundingDao.findByFundingStartTimeAfterAndIsConfirmAndFundingNameContains(LocalDateTime.now(), isStatus, keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.findByFundingStartTimeAfterAndIsConfirm(LocalDateTime.now(), isStatus, PageRequest.of(page, per_page));
                    }
                }
                else if (time == 1) { // 승인된 펀딩 진행 중
                    if (keyword != null) {
                        pages = fundingDao.findByFundingStartTimeBeforeAndFundingEndTimeAfterAndIsConfirmAndFundingNameContains(LocalDateTime.now(), LocalDateTime.now(), isStatus, keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.findByFundingStartTimeBeforeAndFundingEndTimeAfterAndIsConfirm(LocalDateTime.now(), LocalDateTime.now(), isStatus, PageRequest.of(page, per_page));
                    }
                }
                else if (time == 2) { // 승인된 펀딩 진행 후(완료)
                    if (keyword != null) {
                        pages = fundingDao.CompleteSuccessFundingWithKeyword(keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.CompleteSuccessFunding(PageRequest.of(page, per_page));
                    }
                }
                else {
                    if (keyword != null) {
                        pages = fundingDao.CompleteFailFundingWithKeyword(keyword, PageRequest.of(page, per_page));
                    }
                    else {
                        pages = fundingDao.CompleteFailFunding(PageRequest.of(page, per_page));
                    }
                }

            }
            else if (status == 2) {
                isStatus = FundingProject.FundingConfirm.Decline;
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
        fundingDetailResponse.setFundingGoalAmount(String.format("%,d", fundingProject.getFundingGoalAmount()));
        fundingDetailResponse.setFundingThumbnail(fundingProject.getFundingThumbnail());
        fundingDetailResponse.setFundingType(fundingProject.getFundingType());
        fundingDetailResponse.setDonationRate(fundingProject.getDonationRate());
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
    public void patchFundingState(int funding_id, boolean isApprove, String isGoodProject) {
        FundingProject fundingProject = fundingDao.getOne(funding_id);
        fundingProject.setIsConfirm(isApprove ? FundingProject.FundingConfirm.Approve : FundingProject.FundingConfirm.Decline);
        fundingProject.setIsGoodFunding(isGoodProject.equals("Y") ? FundingProject.YesOrNo.Y : FundingProject.YesOrNo.N);
        fundingDao.save(fundingProject);
        int user_id = fundingProject.getUserId();
        User user = userDao.getOne(user_id);
        user.setFundingRegistCount(user.getFundingRegistCount()+1);
        userDao.save(user);
    }

    public void addFunding(int user_id, FundingRequest req) throws IOException {
//        User user = userDao.getOne(user_id);
        FundingProject fundingProject = new FundingProject();
        fundingProject.setFundingType(req.getFundingType());
//        fundingProject.setUserId(req.getUserId());
        fundingProject.setUserId(user_id);
        fundingProject.setFundingName(req.getFundingName());
        fundingProject.setFundingSubtitle(req.getFundingSubtitle());
        fundingProject.setFundingContent(req.getFundingContent());
        fundingProject.setIdolId(req.getIdolId());
//        fundingProject.setIdolName(req.getIdolName());
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
