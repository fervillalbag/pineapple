import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { useHeight, useLocalStorageState } from "../../hooks";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Button, Input, Text, buttonVariants } from "../../ui";
import { Layout } from "../../components/CreatePost";

import CreatePostHeader from "../../assets/images/create-post-tag.png";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

export default function Hashtag() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>(value?.tags || []);
  const [messageError, setMessageError] = useState<string | null>(
    null
  );

  const handleAddTag = (e: any, value: string) => {
    e.preventDefault();
    if (inputValue.length <= 0) return;

    handleUpdate({ tags: [...tags, inputValue] });

    setTags([...tags, value]);
    setInputValue("");
    setMessageError(null);
  };

  const handleNext = () => {
    if (tags.length === 0)
      return setMessageError("Al menos debe tener una etiqueta");

    handleUpdate({ tags });
    setMessageError(null);
    navigate("/create-post-price");
  };

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <Layout>
          <div>
            <h3 className="mb-3 text-lg text-@sura-primary-900">
              Etiquetas
            </h3>

            <form
              onSubmit={(e) => handleAddTag(e, inputValue)}
              className="flex items-center gap-3"
            >
              <Input
                placeholder="#remera"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                type="submit"
                className={buttonVariants({
                  variant: "outline",
                  className: "w-auto px-4",
                })}
              >
                <PlusCircledIcon className="w-6 h-6 text-@sura-primary-900" />
              </Button>
            </form>

            {messageError && (
              <Text
                data-test="register-feedback-error"
                className="text-red-500 mt-2"
              >
                {messageError}
              </Text>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
              {tags.map((tag) => (
                <div
                  className="px-4 py-[7px] rounded-md border-2 border-@sura-primary-200"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div>
            <DotStep value={6} count={7} />
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => navigate(-1)}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Volver
              </Button>
              <Button onClick={handleNext}>Siguiente</Button>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}
