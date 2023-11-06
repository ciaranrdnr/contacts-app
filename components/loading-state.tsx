import { ButtonTextStyled, EmptyContact, HeaderStyled, HeadingStyled } from "@/styles/styled"
import Search from "./search"
import Tabs from "./tab"

const LoadingState = ()=>{
return(
   <div css={{ position: "relative", maxWidth: "600px", margin: "auto"}}>
      <div
        css={{ position: "sticky", top: 0, background: "white", zIndex: 10 }}
      >
        <HeaderStyled>
          <HeadingStyled>Daftar Kontak</HeadingStyled>
          <ButtonTextStyled onClick={() => {}}>
            Tambah Kontak
          </ButtonTextStyled>
        </HeaderStyled>
        <Search onSearch={()=>{}} />
        <Tabs
          activeTab={0}
          tabs={['','']}
         onClick={() => {}}
        />
      </div>
      <EmptyContact>Loading...</EmptyContact>
      </div>
)
}

export default LoadingState
