package com.ilovefundy.dto.funding;

import com.ilovefundy.dto.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "funding_comment")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
public class FundingComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_comment_id")
    private Integer fundingCommentId;

    @ManyToOne
    @JoinColumn(name = "funding_id")
    private FundingProject fundingId;

    @OneToOne
    @JoinColumn(name = "user_nickname")
    private User userNickname;

    @OneToOne
    @JoinColumn(name = "user_picture")
    private User userPicture;
    @Column(name = "funding_comment_content")
    private String fundingCommentContent; // 댓글 내용

    @CreatedDate
    @Column(name = "funding_comment_reg_time")
    private LocalDateTime fundingCommentRegTime; // 댓글 작성 시간
}
