package com.ilovefundy.dto.my;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyIdol {
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "idol_id")
    private Integer idolId;
}
