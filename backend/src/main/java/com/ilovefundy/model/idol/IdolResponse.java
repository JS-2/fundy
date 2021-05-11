package com.ilovefundy.model.idol;

import com.ilovefundy.dto.idol.Idol;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IdolResponse {
    @ApiModelProperty(example = "2")
    private Integer idolId;
    @ApiModelProperty(example = "1")
    private Integer idolGroupId;
    @ApiModelProperty(example = "\"쯔위\"")
    private String idolName;
    @ApiModelProperty(example = "\"https://w.namu.la/s/5703200f638848a16bf998adbd8a6337a08bda86b08f70819792ba65b9d2ed98be58491328215f24783bdb0dbfc18853bf500f243c9c7f75e963963dd23f3c582d0e1e6760c61449b3d8a7c5f1ab11ad1d38eb6f1ee15a3c12c707168422c297ebcaa07fc5f803fc66c71aadfc5b8b68\"")
    private String idolPicture;
    @ApiModelProperty(example = "\"JYP\"")
    private String idolAgency;
    @ApiModelProperty(example = "\"1995-07-16\"")
    private String idolBirthday;
    @ApiModelProperty(example = "23")
    private Integer idolAge;
    @ApiModelProperty(example = "A")
    private Idol.BloodType idolBlood;
    @ApiModelProperty(example = "153")
    private Integer idolHeight;
    @ApiModelProperty(example = "34")
    private Integer idolWeight;
}
