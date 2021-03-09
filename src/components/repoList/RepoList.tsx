import { Table } from 'antd';
import { StarOutlined, ForkOutlined  } from '@ant-design/icons';
import React, { useContext } from 'react';
import { useQuery, gql, QueryResult } from '@apollo/client';
import { SearchContext } from '../../App';

const USERS = gql`
        query post($searchText: String!) {
            search(query: $searchText, type: REPOSITORY, first: 100) {
            nodes {
                ... on Repository {
                    id
                    name
                    url
                    stargazerCount
                    forkCount
                }
            },
        }
    }
`;

interface Repo {
    id: string;
    forkCount: number;
    name: string;
    stargazerCount: number;
    url: string;
}

const RepoList = React.memo(() => {
    const { search } = useContext(SearchContext);
    
    const res: QueryResult = useQuery(USERS, {
        variables: { searchText: search },
    });

    if (res.error) return <p>Error :(</p>;

    const dataSource: Repo[] = res.data?.search.nodes ?? [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name', render: (_: unknown, record: Repo) => <a href={record.url} target='_blank' rel="noreferrer">{record.name}</a>
        },
        {
            title: 'Stars',
            dataIndex: 'stargazerCount',
            key: 'stargazers', render: (text: string) => <span><StarOutlined /> {text}</span>
        },
        {
            title: 'Forks',
            dataIndex: 'forkCount',
            key: 'forks',  render: (text: string) => <span><ForkOutlined /> {text}</span>
        },
    ];

    const rowKey = (record: Repo) => record.id
    return (
        <Table rowKey={rowKey} dataSource={dataSource} columns={columns} loading={res.loading}/>
    )
});

export default RepoList;
