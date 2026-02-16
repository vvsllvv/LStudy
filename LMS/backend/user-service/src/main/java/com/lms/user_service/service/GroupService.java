package com.lms.user_service.service;

import com.lms.user_service.dto.GroupDto;
import com.lms.user_service.entity.Group;
import com.lms.user_service.exception.NotFoundException;
import com.lms.user_service.mapper.GroupMapper;
import com.lms.user_service.mapper.UserMapper;
import com.lms.user_service.repository.GroupRepository;
import com.lms.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupService {
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public final GroupDto readGroup(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Group with this id was not found."));

        return new GroupDto(group.getId(), group.getUsers().stream().map(u -> userMapper.toProfileDto(u)).toList());
    }

    public GroupDto addUserToGroup(Long id, List<Long> users) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Group with this id was not found."));

        group.getUsers().addAll(users.stream().map(u -> userRepository.findById(u)
                .orElseThrow(() -> new UsernameNotFoundException("Not valid."))).collect(Collectors.toList()));

        return groupMapper.toGroupDto(group);
    }
}
