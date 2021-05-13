package com.ilovefundy.service;

import com.ilovefundy.dao.FundingCommentDao;
import com.ilovefundy.dao.FundingDao;
import com.ilovefundy.dao.user.UserDao;
import com.ilovefundy.entity.funding.FundingComment;
import com.ilovefundy.dto.funding.CommentRequest;
import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.user.User;
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
    private final UserDao userDao;

    public List<FundingComment> getFundingCommentList(int page, int per_page) {
        Page<FundingComment> pages = fundingCommentDao.findAll(PageRequest.of(page, per_page));
        System.out.println(pages.getContent());
        return pages.getContent();
    }

    public void addFundingComment(int user_id, int funding_id, CommentRequest req){
        FundingProject funding = fundingDao.findByFundingId(funding_id);
        User user = userDao.findByUserId(user_id);
        FundingComment fundingComment = new FundingComment();
        fundingComment.setFundingCommentContent(req.getContent());
        fundingComment.setFundingCommentRegTime(LocalDateTime.now());
        fundingComment.setUser(user);
        fundingComment.setFunding(funding);
        funding.getFundingComments().add(fundingComment);
        fundingCommentDao.save(fundingComment);
    }

    public void updateFundingComment(int funding_comment_id, CommentRequest req) {
        FundingComment fundingComment = fundingCommentDao.findByFundingCommentId(funding_comment_id);
        fundingComment.setFundingCommentContent(req.getContent());
        fundingCommentDao.save(fundingComment);
    }

    public void deleteFundingComment(int funding_comment_id) {
        fundingCommentDao.deleteById(funding_comment_id);
    }

}
