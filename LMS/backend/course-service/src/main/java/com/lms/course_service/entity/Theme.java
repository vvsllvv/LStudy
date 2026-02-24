package com.lms.course_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "themes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Paragraph> paragraphs;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Test> tests;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Document> documents;
}
