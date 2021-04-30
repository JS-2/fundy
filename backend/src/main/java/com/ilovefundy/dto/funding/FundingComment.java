package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int fundingCommentId;

    private int fundingId;
    private String userNickname;
    private String userPicture;
    private String fundingCommentContent; // 댓글 내용
    private LocalDateTime fundingCommentRegTime; // 댓글 작성 시간
}
