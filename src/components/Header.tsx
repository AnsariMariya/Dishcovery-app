import chefHatIcon from "@/assets/chef-hat-icon.png";

const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <img 
          src={chefHatIcon} 
          alt="Chef Hat" 
          className="w-20 h-20"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
        Dishcovery
        <br />
      </h1>
      <h2 className="text-5xl "><i>Find Recipes from Ingredients</i></h2>
      <br/><br/><br/>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Enter ingredients you have:
      </p>
    </header>
  );
};

export default Header;