package com.study.SpringSecurityMybatis.repository;

import com.study.SpringSecurityMybatis.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User findByUsername(String username);
    User findById(Long id);

    int save(User user);
    int deleteById(Long id);

}
