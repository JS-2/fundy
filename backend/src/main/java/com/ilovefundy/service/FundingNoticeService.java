package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.FundingNoticeDao;
import com.ilovefundy.dto.funding.FundingNotice;
import com.ilovefundy.model.funding.NoticeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

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
        Page<FundingNotice> pages = fundingNoticeDao.findAllByFundingId(funding_id, PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public FundingNotice getFundingNotice(int id) { return fundingNoticeDao.findByFundingNoticeId(id); }

//    public void addFundingNotice(FundingNotice fundingNotice) {
//        fundingNoticeDao.save(fundingNotice);
//    }
    public void addFundingNotice(int funding_id, NoticeRequest req) {
        fundingDao.findByFundingId(funding_id);
        FundingNotice fundingNotice = new FundingNotice();
        fundingNotice.setFundingNoticeContent(req.getContent());
        fundingNotice.setFundingNoticeName(req.getTitle());
        fundingNotice.setFundingNoticeRegisterNickname(req.getNickname());
        fundingNotice.setRegisterPicture(req.getPicture());
//        fundingNotice.setFundingNoticeRegTime(req.getTime());
        fundingNoticeDao.save(fundingNotice);
    }

//    public void editFundingNotice(FundingNotice fundingNotice) {
//        fundingNoticeDao.save(fundingNotice);
//    }

    public void deleteFundingNotice(int funding_notice_id) {
        fundingNoticeDao.deleteById(funding_notice_id);
    }
}
