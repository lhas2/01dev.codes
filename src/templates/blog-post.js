import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { Disqus } from "gatsby-plugin-disqus"

const Content = styled.main`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding-top: 120px;

  .cover {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
  }

  h1 {
    margin-top: 20px;
    font-weight: 900;
    font-family: "Merriweather";
  }

  article {
    margin-bottom: 30px;
  }

  small {
    font-family: "Merriweather";
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.75);
    margin-top: 10px;
    margin-bottom: 10px;
  }

  section p {
    font-family: "Merriweather";
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
  }

  section p:first-child::first-letter {
    color: rgba(0, 0, 0, 0.8);
    font-size: 320%;
    font-weight: 800;
    margin-right: 5px;
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const disqusConfig = {
      url: `${this.props.data.site.siteMetadata.siteUrl + location.pathname}`,
      identifier: post.id,
      title: post.title,
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Content>
          <article>
            <div
              className="cover"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80)",
              }}
            />
            <header>
              <h1
                style={{
                  marginBottom: 0,
                }}
              >
                {post.frontmatter.title}
              </h1>
              <small
                style={{
                  display: `block`,
                }}
              >
                {post.frontmatter.date} • Escrito por{" "}
                {this.props.data.site.siteMetadata.author}
              </small>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr style={{}} />
            <footer>
              <Bio />
            </footer>
          </article>
          <Disqus config={disqusConfig} />
        </Content>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        cover
        date(formatString: "DD MMM")
        description
      }
    }
  }
`