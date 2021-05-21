package com.ilovefundy.entity.pay;

import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "pay_info")
@AllArgsConstructor
@NoArgsConstructor
public class PayInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
//    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "funding_id")
    private FundingProject funding;

    @Column(name = "pay_amount")
    private Long payAmount; // 펀딩 결제 금액

    @Column(name = "pay_datetime")
    private LocalDateTime payDatetime;  // 펀딩 결제 시간

    @PrePersist
    public void payDatetime() {
        this.payDatetime = LocalDateTime.now();
    }
}
