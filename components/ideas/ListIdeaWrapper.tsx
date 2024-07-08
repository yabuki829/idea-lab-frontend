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
        alert(success)
        if (success) {
          setIdeas(prevIdeas => [...prevIdeas, ...newIdeas]);
          setHasMore(newIdeas.length > 0);
        }
        else{
          setHasMore(false)
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
          <div className="flex justify-center my-4">
            <button onClick={handleLoadMore} className="bg-white border-2 rounded-full py-3 px-2">
              もっと見る
            </button>
          </div>
        )}
       
      </div>
    );
  };
  
export default ListIdeasWrapper;