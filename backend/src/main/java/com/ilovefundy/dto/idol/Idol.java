package com.ilovefundy.dto.idol;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ilovefundy.dto.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="idolId")
@Getter
@Setter
@Entity
public class Idol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idol_id")
    private Integer idolId;

    @BatchSize(size=10)
//    @JsonBackReference
    @JsonIgnore
    @ManyToMany(mappedBy = "idols")
    private Set<User> users = new LinkedHashSet<>();

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
