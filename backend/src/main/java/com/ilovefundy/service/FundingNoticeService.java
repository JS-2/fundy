package com.ilovefundy.service;

import com.ilovefundy.dao.FundingNoticeDao;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@RestController
public class FundingNoticeService {
    private final FundingNoticeDao fundingNoticeDao;
}
