package com.lms.course_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "paragraphs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paragraph {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", nullable = false, length = 255)
    private String content;

    @ManyToOne
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;

//    @OneToMany(mappedBy = "paragraph", cascade = CascadeType.ALL)
//    private List<Page> pages;

}
