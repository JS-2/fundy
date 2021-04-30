package com.ilovefundy.dto.idol;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Idol {
    @Id
    @GeneratedValue
    @Column(name = "idol_id")
    private Integer idolId;
    @Column(name = "idol_name")
    private String idolName;
    @Column(name = "idol_picture")
    private String idolPicture;
    @Column(name = "idol_birthday")
    private String idolBirthday;
    @Column(name = "idol_age")
    private Integer idolAge;
    @Column(name = "idol_height")
    private Integer idolHeight;
    @Column(name = "idol_weight")
    private Integer idolWeight;
    @Column(name = "idol_blood")
    @Enumerated(EnumType.STRING)
    private BloodType idolBlood;
    @Column(name = "idol_agency")
    private String idolAgency;
    @Column(name = "idol_group_id")
    private Integer idolGroupId; // 그룹아이디(idol_id 참조)

    private enum BloodType {
        A, B, O, AB;
    }
}
