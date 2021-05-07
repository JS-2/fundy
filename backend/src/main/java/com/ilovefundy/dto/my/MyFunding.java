package com.ilovefundy.dto.my;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyFunding {
    @Column(name = "funding_id")
    private Integer fundingId;
    @Column(name = "user_id")
    private Integer userId;
}
