package com.ilovefundy.dto.idol;

import lombok.Data;

@Data
public class IdolDto {
    private int idol_id;
    private String idol_name;
    private String idol_picture;
    private String idol_birthday;
    private int idol_age;
    private int idol_height;
    private int idol_weight;
    private BloodType idol_blood;
    private String idol_agency;
    private int idol_group_id; // 그룹아이디(idol_id 참조)

    private enum BloodType {
        A, B, O, AB;
    }
}
