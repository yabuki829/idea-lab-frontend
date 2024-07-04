"use client";

import React, { useState, useEffect } from 'react';
import ListIdeas from '@/components/ideas/ListIdeas';
import { IdeaType, getIdeaList } from '@/actions/idea';
import { UserType } from '@/lib/nextauth';

interface ListIdeasWrapperProps {
    initialIdeas: IdeaType[];
    user: UserType | null;
  }
  
  const ListIdeasWrapper: React.FC<ListIdeasWrapperProps> = ({ initialIdeas, user }) => {
    const [ideas, setIdeas] = useState<IdeaType[]>(initialIdeas);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      if (page === 1) return; // 初期ロード時はスキップ
      const loadIdeas = async () => {
        setLoading(true);
        const { success, ideas: newIdeas } = await getIdeaList(page);
        if (success) {
          setIdeas(prevIdeas => [...prevIdeas, ...newIdeas]);
          setHasMore(newIdeas.length > 0);
        }
        setLoading(false);
      };
      loadIdeas();
    }, [page]);
  
    const handleLoadMore = () => {
      setPage(prevPage => prevPage + 1);
    };
  
    return (
      <div>
        <ListIdeas ideas={ideas} user={user} />
        {hasMore && (
          <div className="flex justify-center mt-4">
            <button onClick={handleLoadMore} className="btn">
              もっと見る
            </button>
          </div>
        )}
        {loading && <p className="text-center">読み込み中...</p>}
      </div>
    );
  };
  
  export default ListIdeasWrapper;