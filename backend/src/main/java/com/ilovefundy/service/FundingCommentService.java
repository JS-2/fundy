package com.ilovefundy.service;

import com.ilovefundy.dao.FundingCommentDao;
import com.ilovefundy.dto.funding.FundingComment;
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
public class FundingCommentService {
    private final FundingCommentDao fundingCommentDao;

    public List<FundingComment> getFundingCommentList(int page, int per_page) {
        Page<FundingComment> pages = fundingCommentDao.findAll(PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

}
