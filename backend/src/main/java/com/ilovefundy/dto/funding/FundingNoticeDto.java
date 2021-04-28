package com.ilovefundy.dto.funding;

import java.time.LocalDateTime;

public class FundingNoticeDto {
    private int funding_notice_id;
    private int funding_id;
    private String funding_notice_name;
    private String funding_noice_register_nickname;
    private String register_picture;
    private String funding_notice_content;
    private LocalDateTime funding_notice_reg_time; // 공지사항 작성시간
}
