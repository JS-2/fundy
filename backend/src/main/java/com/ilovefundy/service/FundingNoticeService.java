package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingNoticeDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.dto.funding.FundingNoticeListResponse;
import com.ilovefundy.entity.funding.FundingNotice;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.dto.funding.NoticeRequest;
import com.ilovefundy.dto.funding.NoticeUpdateRequest;
import com.ilovefundy.entity.user.User;
import com.ilovefundy.utils.SetterUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
@Service
public class FundingNoticeService {
    private final FundingDao fundingDao;
    private final FundingNoticeDao fundingNoticeDao;
    private final UserDao userDao;

    public List<FundingNoticeListResponse> getFundingNoticeList(int funding_id, int page, int per_page) {
        List<FundingNoticeListResponse> fundingNoticeListResponse = new LinkedList<>();
        Page<FundingNotice> pages = fundingNoticeDao.findAllByFunding_FundingId(funding_id, PageRequest.of(page, per_page, new Sort(Sort.Direction.DESC, "fundingNoticeRegTime")));
        List<FundingNotice> fundingNoticeList = pages.getContent();
        for (FundingNotice fundingNotice : fundingNoticeList) {
            fundingNoticeListResponse.add(SetterUtils.setFundingNoticeListResponse(fundingNotice));
        }
//        System.out.println(pages.getContent());
        return fundingNoticeListResponse;
    }

    public FundingNotice getFundingNotice(int id) { return fundingNoticeDao.findByFundingNoticeId(id); }

    @Transactional
    public String addFundingNotice(int user_id, int funding_id, NoticeRequest req) {
        FundingProject funding = fundingDao.findByFundingId(funding_id);
        FundingNotice fundingNotice = new FundingNotice();
        User user = userDao.findByUserId(user_id);
        if (funding.getUserId() == user_id) {
            fundingNotice.setFundingNoticeContent(req.getContent());
            fundingNotice.setFundingNoticeName(req.getTitle());
    //        fundingNotice.setFundingNoticeRegisterNickname(req.getNickname());
    //        fundingNotice.setRegisterPicture(req.getPicture());
            fundingNotice.setFundingNoticeRegTime(LocalDateTime.now());
            fundingNotice.setUser(user);
            fundingNotice.setFunding(funding);
            funding.getFundingNotices().add(fundingNotice);
            fundingNoticeDao.save(fundingNotice);
            return "success";
        }
        else {
            return "fail";
        }
    }

    public void editFundingNotice(int funding_notice_id, NoticeUpdateRequest req) {
        FundingNotice fundingNotice = fundingNoticeDao.findByFundingNoticeId(funding_notice_id);
        fundingNotice.setFundingNoticeName(req.getTitle());
        fundingNotice.setFundingNoticeContent(req.getContent());
        fundingNoticeDao.save(fundingNotice);
    }

    public void deleteFundingNotice(int funding_notice_id) {
        fundingNoticeDao.deleteById(funding_notice_id);
    }
}
