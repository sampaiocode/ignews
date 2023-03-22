import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicCLient } from '../../services/prismic';

jest.mock('../../services/prismic');

const posts = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    summary: 'Post summary',
    updatedAt: '21 de Março'
  }
];

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicCLient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByType: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My new post' }],
              content: [
                {
                  type: 'paragraph',
                  text: 'Post summary'
                }
              ]
            },
            last_publication_date: '03-21-23'
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              summary: 'Post summary',
              updatedAt: '21 de março de 2023'
            }
          ]
        }
      })
    );
  });
});
