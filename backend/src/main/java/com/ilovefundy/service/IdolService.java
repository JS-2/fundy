package com.ilovefundy.service;

import com.ilovefundy.dao.IdolDao;
import com.ilovefundy.dto.idol.Idol;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class IdolService {
    private final IdolDao idolDao;

    public List<Idol> getIdolList(int page, int per_page) {
        Page<Idol> pages = idolDao.findAll(PageRequest
                                            .of(page, per_page));
        return pages.getContent();
    }

    public Idol getIdol(int id) {
        return idolDao.findByIdolId(id);
    }
}
