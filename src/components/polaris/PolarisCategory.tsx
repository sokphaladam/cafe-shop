import { Button, Collapsible, Icon, Listbox, Popover, TextField } from "@shopify/polaris";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ProductInput, useCategoryListQuery } from "@/gql/graphql";
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@shopify/polaris-icons';

const CategoryCallbackContext = React.createContext<{
  value?: number;
  onChange?: (v: number) => void;
}>({});

interface CategoryTreeNode {
  id: number;
  name: string;
  path: string;
  children: CategoryTreeNode[];
}

interface CategoryPrebuild {
  root: CategoryTreeNode;
  hash: { [key: number]: CategoryTreeNode };
}

interface PropsSuggest {
  value: ProductInput;
  // onClick: (e: number) => void;
  onChange: (v: ProductInput) => void;
}

interface Props {
  value: ProductInput;
  onChange: (v: ProductInput) => void;
}

export function PolarisCategory(props: Props) {
  const [active, setActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<any>({
    root: { children: [], id: 0, name: "", path: "" },
    hash: {},
  });
  const [treeNode, setTreeNode] = useState<CategoryTreeNode[]>([]);
  const [selectTree, setSelectTree] = useState<CategoryTreeNode | null>(null);
  const [previousTreeId, setPreviousTreeId] = useState<number[]>([0]);
  const [showAll, setShowAll] = useState(false);
  const { data, loading } = useCategoryListQuery({
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data && data!.categoryList) {
      const builds = data!.categoryList;
      setCategory(builds);
      setTreeNode(builds.root.children);
    }
  }, [data, setCategory, setTreeNode]);

  const filterSearch = useCallback(
    (value: string) => {
      if (value.length >= 2) {
        const filterRegex = new RegExp(value, "i");
        const filter = data?.categoryList?.filter((x: any) => x?.name.match(filterRegex));

        if ((filter || []).length > 0) {
          const builds = filter
          setCategory(builds);
          console.log(builds);
          setTreeNode(
            Object.keys(builds.hash)
              .filter((x) => x !== "0")
              .map((x: any) => builds.hash[x]),
          );
        }
      }
    },
    [setCategory, setTreeNode, data],
  );

  const handleQuery = useCallback(
    async (value: string) => {
      await setKeyword(value);
      if (value === "") {
        if (data && data!.categoryList) {
          const builds = data!.categoryList;
          await setCategory(builds);
          await setTreeNode(builds.root.children);
        }
        return;
      }
      await setTimeout(() => filterSearch(value), 500);
    },
    [filterSearch, data, setCategory, setTreeNode],
  );

  const handleSelectChildTree = useCallback(
    (treeId: number) => {
      const tree = category.hash[treeId];
      setSelectTree(tree);
      setTreeNode(tree.children);
      setPreviousTreeId([...previousTreeId, tree.id]);
      setShowAll(false);
    },
    [category, setTreeNode, setSelectTree, setPreviousTreeId, previousTreeId, setShowAll],
  );

  const handlePreviousSelectChildTree = useCallback(() => {
    const arr = [...previousTreeId];
    const newArr = arr.filter((x) => x !== arr[arr.length - 1]);
    const tree = category.hash[newArr[newArr.length - 1]];
    setSelectTree(tree);
    setTreeNode(tree.children);
    setPreviousTreeId(newArr);
    setShowAll(false);
  }, [category, setTreeNode, setSelectTree, setPreviousTreeId, previousTreeId, setShowAll]);

  const cat =
    data
      ? (category.hash as any)[String(props.value.category || 0)] || { path: "", name: "" }
      : { path: "", name: "" };

  return (
    <div>
      {!loading && category && (
        <Popover
          activator={
            <TextField
              prefix={<Icon source={SearchIcon as any} tone="base" />}
              label={`Category${(props.value.category || 0) > 0 ? `: ${cat.path || ""}${cat.name || ""}` : ""}`}
              autoComplete="off"
              placeholder="Search"
              onFocus={() => setActive(true)}
              value={keyword}
              onChange={handleQuery}
            // error={
            //   context.error?.name === "category_id" && "Please search category or select category from suggestion."
            // }
            />
          }
          active={active}
          onClose={() => {
            setActive(false);
          }}
        >
          <Popover.Section>
            <CategoryCallbackContext.Provider
              value={{
                value: props.value.category || 0,
                onChange: (v) => {
                  if (props.onChange)
                    props.onChange({
                      ...props.value,
                      category: v,
                    });
                },
              }}
            >
              {selectTree !== null && previousTreeId.length > 1 && !keyword && (
                <div className='flex flex-row justify-between my-[0.04125rem]'>
                  <div onClick={handlePreviousSelectChildTree} className="hover:bg-gray-400 hover: rounded-full mr-3">
                    <Icon source={ChevronLeftIcon} tone="base" />
                  </div>
                  <div
                    className={props.value.category === selectTree.id ? 'bg-gray-200 flex flex-row items-center' : ""}
                    onClick={() => props.onChange({ ...props.value, category: selectTree.id })}
                  >
                    <div className={'p-0 w-[90px] mr-3'}>{selectTree.name}</div>
                    {props.value.category === selectTree.id && <Icon source={CheckIcon} tone="base" />}
                  </div>
                </div>
              )}
              {(treeNode.length > 6 && showAll === false ? treeNode.slice(0, 6) : treeNode).map((tree) => {
                return (
                  <div key={tree.id} className={'flex flex-row justify-between my-[0.04125rem]'}>
                    <div
                      className={props.value.category === tree.id ? 'bg-gray-200 flex flex-row items-center' : ""}
                      onClick={() => props.onChange({ ...props.value, category: tree.id })}
                    >
                      {props.value.category === tree.id && <Icon source={CheckIcon} tone="base" />}
                      <div className={'p-0 w-[90px] ml-3'}>{tree.name}</div>
                    </div>
                    {tree.children.length > 0 && !keyword ? (
                      <div onClick={() => handleSelectChildTree(tree.id)} className="hover:bg-gray-400 hover: rounded-full ml-3">
                        <Icon source={ChevronRightIcon} tone="base" />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
              {treeNode.length > 6 && showAll === false && (
                <div onClick={() => setShowAll(true)} >
                  <div className="p-2 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer text-blue-700 hover:bg-gray-200">Show all {treeNode.length}</div>
                </div>
              )}
            </CategoryCallbackContext.Provider>
          </Popover.Section>
        </Popover>
      )}
    </div>
  );
}