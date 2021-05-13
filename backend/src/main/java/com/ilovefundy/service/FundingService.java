package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.model.funding.FundingDetailResponse;
import com.ilovefundy.model.funding.FundingListResponse;
import com.ilovefundy.model.funding.FundingRequest;
import com.ilovefundy.utils.SetterUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class FundingService {
    private final FundingDao fundingDao;

//    public List<FundingProject> getFundingList(int page, int per_page) {
//        Page<FundingProject> pages = fundingDao.findAll(PageRequest.of(page, per_page));
//        System.out.println(pages.getContent());
//        return pages.getContent();
//    }
    public List<FundingListResponse> getFundingList(int page, int per_page) {
        List<FundingListResponse> fundingListResponse = new LinkedList<>();
        Page<FundingProject> pages = fundingDao.findAll(PageRequest.of(page, per_page, new Sort(Sort.Direction.DESC, "fundingEndTime")));
        List<FundingProject> fundingProjectList = pages.getContent();
        for (FundingProject fundingProject : fundingProjectList){
            fundingListResponse.add(SetterUtils.setFundingListResponse(fundingProject));
        }
        return fundingListResponse;
    }

    public List<FundingDetailResponse> getFunding(int id) {
        List<FundingProject> funding = fundingDao.findByFundingId(id);
        List<FundingDetailResponse> fundingDetailResponse = new LinkedList<>();
        for (FundingProject fundingProject : funding) {
            fundingDetailResponse.add(SetterUtils.setFundingDetailResponse(fundingProject));
        }
        return fundingDetailResponse;
    }

    public void patchFundingState(int funding_id, boolean isApprove, char isGoodProject) {
        FundingProject fundingProject = fundingDao.getOne(funding_id);
        fundingProject.setIsConfirm(isApprove ? FundingProject.FundingConfirm.Approve : FundingProject.FundingConfirm.Decline);
        fundingProject.setIsGoodFunding(isGoodProject == 'Y' ? FundingProject.YesOrNo.Y : FundingProject.YesOrNo.N);
        fundingDao.save(fundingProject);
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
