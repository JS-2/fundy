package com.ilovefundy.dto.funding;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
public class FundingCommentDto {
    @Id
    @GeneratedValue
    private int funding_comment_id;

    private int funding_id;
    private String user_nickname;
    private String user_picture;
    private String funding_comment_content; // 댓글 내용
    private LocalDateTime funding_comment_reg_time; // 댓글 작성 시간
}
