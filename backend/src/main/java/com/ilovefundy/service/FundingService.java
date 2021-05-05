package com.ilovefundy.service;

import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dto.funding.FundingProject;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = {"*"})
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
}
