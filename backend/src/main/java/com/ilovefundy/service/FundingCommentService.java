package com.ilovefundy.service;

import com.ilovefundy.dao.FundingCommentDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dto.funding.FundingComment;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.model.funding.CommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Service
public class FundingCommentService {
    private final FundingDao fundingDao;
    private final FundingCommentDao fundingCommentDao;

    public List<FundingComment> getFundingCommentList(int page, int per_page) {
        Page<FundingComment> pages = fundingCommentDao.findAll(PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public void addFundingComment(int funding_id, CommentRequest req){
        fundingDao.findByFundingId(funding_id);
        FundingComment fundingComment = new FundingComment();
        fundingComment.setFundingCommentContent(req.getContent());
        fundingComment.setFundingCommentRegTime(LocalDateTime.now());
        fundingCommentDao.save(fundingComment);
    }

    public void deleteFundingComment(int funding_comment_id) {
        fundingCommentDao.deleteById(funding_comment_id);
    }

}
