package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FundingComment {
    @Id
    @GeneratedValue
    @Column(name = "funding_comment_id")
    private Integer fundingCommentId;

    @Column(name = "funding_id")
    private Integer fundingId;
    @Column(name = "user_nickname")
    private String userNickname;
    @Column(name = "user_picture")
    private String userPicture;
    @Column(name = "funding_comment_content")
    private String fundingCommentContent; // 댓글 내용
    @Column(name = "funding_comment_reg_time")
    private LocalDateTime fundingCommentRegTime; // 댓글 작성 시간
}
