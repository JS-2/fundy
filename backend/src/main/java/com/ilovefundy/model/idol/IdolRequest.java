package com.ilovefundy.model.idol;

import com.ilovefundy.dto.idol.Idol;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class IdolRequest {
    @ApiModelProperty(example = "민영")
    private String idolName;
    @ApiModelProperty(example = "브레이브 엔터테인먼트")
    private String idolAgency;
    @ApiModelProperty(example = "30")
    private Integer idolAge;
    @ApiModelProperty(example = "19900912")
    private String idolBirthDay;
    @ApiModelProperty(example = "AB")
    private Idol.BloodType idolBlood;
    @ApiModelProperty(example = "165")
    private Integer idolHeight;
    @ApiModelProperty(example = "50")
    private Integer idolWeight;
    @ApiModelProperty(example = "./img/~~이미지경로")
    private String idolPicture;
    @ApiModelProperty(example = "2")
    private Integer idolGroupId;
}
