package com.ilovefundy.dto.pay;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
    private long payAmount; // 펀딩 결제 금액

    @Column(name = "pay_datetime")
    private LocalDateTime payDatetime;  // 펀딩 결제 시간

    @PrePersist
    public void payDatetime() {
        this.payDatetime = LocalDateTime.now();
    }
}
