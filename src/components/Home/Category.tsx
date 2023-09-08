import { useCategories } from "../../hooks/categories";
import { Text } from "../../ui";

interface ButtonCategoryProps {
  children?: React.ReactNode;
  index: number;
  length: number;
}

interface CategoryItemProps {
  category: any;
  index: number;
  length: number;
}

const Button: React.FC<ButtonCategoryProps> = ({
  children,
  index,
  length,
}) => {
  return (
    <div
      className={`w-min mr-3 ${index === 0 ? "pl-5" : "pl-0"} ${
        index === length ? "pr-5 mr-0" : "pr-0"
      }`}
    >
      <button className="border w-32 flex flex-col justify-end p-[10px] h-32 border-@sura-primary-900 border-b-4 rounded-md">
        {children}
      </button>
    </div>
  );
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  index,
  length,
}) => {
  return (
    <Button index={index} length={length}>
      <Text className="text-@sura-primary-900 font-semibold">
        {category.name}
      </Text>
      <Text className="font-semibold text-@sura-primary-900">
        12 <span className="font-normal">productos</span>
      </Text>
    </Button>
  );
};

export default function Category() {
  const { queryCategory } = useCategories();

  if (queryCategory.isLoading) return <div>loading..</div>;
  if (queryCategory.isError) return <div>error..</div>;

  const lengthCategoryArray = queryCategory?.data.data
    ? queryCategory?.data.data.length - 1
    : 0;

  return (
    <div className="pb-5">
      <Text className="pl-5 text-[22px] font-medium text-@sura-primary-900">
        Categorias
      </Text>

      <div className="mt-3 flex hide-scrollbar overflow-x-auto">
        {!queryCategory.data.data ? (
          <div>no hay categoria</div>
        ) : (
          queryCategory.data.data.map((category, index) => {
            return (
              <CategoryItem
                key={category.id}
                index={index}
                category={category}
                length={lengthCategoryArray}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
