package com.ilovefundy.service;

import com.ilovefundy.dao.FundingNoticeDao;
import com.ilovefundy.dto.funding.FundingNotice;
import com.ilovefundy.dto.funding.FundingProject;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingNoticeService {
    private final FundingNoticeDao fundingNoticeDao;

    public List<FundingNotice> getFundingNoticeList(int page, int per_page) {
        Page<FundingNotice> pages = fundingNoticeDao.findAll(PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public FundingNotice getFundingNotice(int id) { return fundingNoticeDao.findByFundingNoticeId(id); }

    public void addFundingNotice(FundingNotice fundingNotice) {
        fundingNoticeDao.save(fundingNotice);
    }

//    public void editFundingNotice(FundingNotice fundingNotice) {
//        fundingNoticeDao.save(fundingNotice);
//    }

    public void deleteFundingNotice(int funding_notice_id) {
        fundingNoticeDao.deleteById(funding_notice_id);
    }
}
