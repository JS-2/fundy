package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingRegisterDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingRegister;
import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.funding.FundingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class FundingService {
    private final FundingDao fundingDao;

    public List<FundingProject> getFundingList(int page, int per_page) {
        Page<FundingProject> pages = fundingDao.findAll(PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public FundingProject getFunding(int id) { return fundingDao.findByFundingId(id); }

    public void patchFundingState(int funding_id, boolean isApprove, char isGoodProject) {
        FundingProject fundingProject = fundingDao.getOne(funding_id);
        fundingProject.setIsConfirm(isApprove ? FundingProject.FundingConfirm.Approve : FundingProject.FundingConfirm.Decline);
        fundingProject.setIsGoodFunding(isGoodProject == 'Y' ? FundingProject.YesOrNo.Y : FundingProject.YesOrNo.N);
        fundingDao.save(fundingProject);
    }

    public void addFunding(FundingRequest req) {
        FundingProject fundingProject = new FundingProject();
        fundingProject.setFundingType(req.getFundingType());
        fundingProject.setFundingName(req.getFundingName());
        fundingProject.setFundingContent(req.getFundingContent());
        fundingProject.setIdolName(req.getIdolName());
        fundingProject.setFundingGoalAmount(req.getGoalAmount());
        fundingProject.setFundingStartTime(req.getStartTime());
        fundingProject.setFundingEndTime(req.getEndTime());
        fundingProject.setFundingThumbnail(req.getThumbnail());
        fundingProject.setIsDonate(req.getIsDonate());
        fundingDao.save(fundingProject);
    }
}
