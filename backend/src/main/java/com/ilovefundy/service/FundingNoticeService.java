package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingNoticeDao;
import com.ilovefundy.entity.funding.FundingNotice;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.dto.funding.NoticeRequest;
import com.ilovefundy.dto.funding.NoticeUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
@Service
public class FundingNoticeService {
    private final FundingDao fundingDao;
    private final FundingNoticeDao fundingNoticeDao;

    public List<FundingNotice> getFundingNoticeList(int funding_id, int page, int per_page) {
//        Page<FundingNotice> pages = fundingNoticeDao.findAll(PageRequest.of(page, per_page));
        Page<FundingNotice> pages = fundingNoticeDao.findAllByFunding_FundingId(funding_id, PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public FundingNotice getFundingNotice(int id) { return fundingNoticeDao.findByFundingNoticeId(id); }

    @Transactional
    public void addFundingNotice(int funding_id, NoticeRequest req) {
//        fundingDao.findByFundingId(funding_id);
        FundingProject funding = fundingDao.findByFundingId(funding_id);
        FundingNotice fundingNotice = new FundingNotice();
//        FundingProject fundingNotice = fundingDao.getOne(funding_id);
        fundingNotice.setFundingNoticeContent(req.getContent());
        fundingNotice.setFundingNoticeName(req.getTitle());
        fundingNotice.setFundingNoticeRegisterNickname(req.getNickname());
        fundingNotice.setRegisterPicture(req.getPicture());
        fundingNotice.setFundingNoticeRegTime(LocalDateTime.now());
        fundingNotice.setFunding(funding);
//        fundingNotice.setFundingId(funding_id);
        fundingNoticeDao.save(fundingNotice);
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
